import { API_URL } from "@/lib/utils/env";
import axios from "axios";

const postUtility = async (data: Object) => {
    return await axios.post(`${API_URL}/utility`, {
        ...data,
    });
};

const putUtility = async (data: any) => {
    return await axios.put(`${API_URL}/utility/${data!.slug as string}`, {
        ...data
    })
}

const getUtility = async (slug?: string) => {
    return await axios.get(`${API_URL}/utility/${slug}`)
}

const deleteUtility = async (slug: string) => {
    return await axios.delete(`${API_URL}/utility/${slug}`)
}

const getContactActions = async (slug: string) => {
    return await axios.get(`${API_URL}/contactActions/${slug}`)
}

export default {
    postUtility,
    getUtility,
    putUtility,
    deleteUtility,
    getContactActions,
};
