//Currently not in use; Everything is inside hooks

import { functions } from '../lib/appwrite';

export async function chatBot(payload) {
    const execution = await functions.createExecution("68bf09ca0034fd33e5e0", JSON.stringify(payload))
    console.log(JSON.parse(execution.response || execution.result))
    return JSON.parse(execution.response || execution.result);
}