import type { RequestHandler } from './$types';

const connected = new Set<string>();

export const GET: RequestHandler = async ({ params }) => {
    const roomID = params.roomID;
    console.log(connected);
    connected.add(roomID);
    
    return new Response(JSON.stringify(Array.from(connected)));
};

export const POST: RequestHandler = async ({ params }) => {
    const roomID = params.roomID;
    console.log(connected);
    connected.delete(roomID);
    
    return new Response(JSON.stringify(Array.from(connected)));
};

