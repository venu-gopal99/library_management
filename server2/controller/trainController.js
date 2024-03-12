const trainModel = require("../model/trainModel")
const { default: mongoose } = require("mongoose");

class trainController{
    createTrain = async (req, res) => {
        try {
            const { train_name, train_No, train_departs, train_destination, total_coach, seats_eachcoach, price, shedule_time } = req.body;
    
            // Validate input data
            if (!Number.isInteger(total_coach) || !Number.isInteger(seats_eachcoach) || total_coach <= 0 || seats_eachcoach <= 0) {
                return res.status(400).json({ message: 'Invalid configuration: total_coach and seats_eachcoach must be positive integers.' });
            }
    
            // Generate seat numbers
            const seats = [];
            const seatLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let coach = 1; coach <= total_coach; coach++) {
                const coachLetter = seatLetters.charAt(coach - 1); // Get coach letter based on its index
                for (let seat = 1; seat <= seats_eachcoach; seat++) {
                    seats.push(`${coachLetter}${seat}`);
                }
            }
    
            // Create new train document
            const newTrain = await trainModel.create({
                train_name,
                train_No,
                train_departs,
                train_destination,
                total_coach,
                seats_eachcoach,
                price,
                shedule_time,
                train_seats: seats,
            });
    
            // Save the train document
            await newTrain.save();
    
            res.status(201).json({ message: 'Train created successfully.', train: newTrain });
        } catch (error) {
            console.error('Error creating train:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getAll = async(req,res)=>{
        try {
            const allTrain = await trainModel.find();
            if(!allTrain){
                return res.status(404).json({message:"no trains found"})
            };
            res.status(201).json({allTrain})
        } catch (error) {
            res.error(500).json({message:error})
            
        }
    };

    getOne=async(req,res)=>{
        try {
            const {id}=req.params
            const oneTrain = await trainModel.findById({_id:id});
            res.status(201).json({oneTrain})
        } catch (error) {
            res.error(500).json({message:error})
        }
    };
    
}

module.exports = trainController;