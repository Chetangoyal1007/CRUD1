import usermodels from "../models/user.js";

const createuser = async (req, res) => {
    try {
        const { name, fathername, email, phoneno } = req.body;

        const NewUser = new usermodels({
            name,
            fathername,
            email,
            phoneno
        });
        await NewUser.save();
        res.status(200).json(NewUser);
    } catch (error) {
        res.status(404).json({ message: 'Error creating user' });
    }
};

const getuser = async (req, res) => {
    try {
        const users = await usermodels.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching users' });
    }
};

const updateuser = async (req, res) => {
    try {
        const userid = req.params.id;
        const updateduser = await usermodels.findByIdAndUpdate(userid, req.body, { new: true });
        if (!updateduser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(404).json({ message: 'Error updating user' });
    }
};

const deleteuser = async (req, res) => {
    try {
        const userid = req.params.id;
        await usermodels.findByIdAndDelete(userid);
        res.status(200).json("User Deleted");
    } catch (error) {
        res.status(404).json({ message: 'Error deleting user' });
    }
};

export { createuser, getuser, updateuser, deleteuser };
