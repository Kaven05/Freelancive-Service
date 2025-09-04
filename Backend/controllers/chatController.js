const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const generateRoomId = () => {
    return 'room_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
}

exports.createChatRoom = async (req, res) => {
    const { requestId, recruiterId, applicantId } = req.body;
    try {
        let room =await ChatRoom.findOne({ requestId, recruiterId, applicantId });
    
        if (!room) {
            const roomId = generateRoomId();
            room = new ChatRoom({
                requestId,
                recruiterId,
                applicantId,
                roomId
            });
            await room.save();
        }
        res.status(200).json({ success: true, roodId:room.roomId });
    }
    catch (error) {
        console.error('Error creating chat room:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
exports.getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
