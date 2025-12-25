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