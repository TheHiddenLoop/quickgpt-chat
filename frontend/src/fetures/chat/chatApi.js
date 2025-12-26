import { axiosInstance } from "../../libs/axios";

export const sendMessageApi = async (formData) => {
    try {
        const res = await axiosInstance.post("/ai/chat/message", formData);
        return res.data;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Chat message failed";
        throw new Error(message);
    }
};

export const getConversationsApi = async () => {
    try {
        const res = await axiosInstance.get("/ai/all/conversations");
        return res.data;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Error in fetching conversations";
        throw new Error(message);
    }
};

export const getMessagesApi = async (conversationId) => {
    try {
        const res = await axiosInstance.get(`/ai/message/${conversationId}`);
        return res.data;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Error in fetching message";
        throw new Error(message);
    }
};