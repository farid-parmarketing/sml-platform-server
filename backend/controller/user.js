import Delete from "../model/delete.js";
import User from "../model/user.js";

const deleteData = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const findUser = await User.findOne({ $and: [{ email }, { mobile }] });
    if (!findUser) {
      return res
        .status(200)
        .json({ success: false, message: "Account not found" });
    } else {
      const findExisting = await Delete.findOne({
        $and: [{ email }, { mobile }],
      });
      if (findExisting) {
        return res
          .status(200)
          .json({ success: false, message: "Data aready submitted" });
      } else {
        const newData = new Delete({ name, email, mobile });
        await newData.save();
        return res.status(200).json({ success: true, message: "Data saved" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getDeleted = async (req, res) => {
  try {
    const deleted = await Delete.find({});
    if (deleted) {
      return res.status(200).json({ success: true, result: deleted });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Failed to get data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export { deleteData, getDeleted };
