import * as dotenv from "dotenv";
import {createError} from "../error.js";
import {Configuration, OpenAIApi} from 'openai';

dotenv.config();

// SETUP OPENAI API KEY
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// Controller

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        const generateImage = response.data.data[0].b64_json;

        return res.status(200).json({ photo : generateImage });
    }
    catch(err)
    {
        next(
            createError(
                error.status,
                error?.respose?.data?.error?.message || error.message
            )
        );
    }
}