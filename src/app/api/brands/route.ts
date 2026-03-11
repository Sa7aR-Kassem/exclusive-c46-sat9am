// endpoint & method

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/brands
// GET POST

export async function GET(req: NextRequest) {
    // some logic  
    //   write queries
    // fetch
    const cookie = await cookies()

    return NextResponse.json({
        message: "success",
        data: [
            { name: "Brand 1", image: "path of the image", id: "8w7chu77" },
            { name: "Brand 2", image: "path of the image", id: "8w7chu77" },
            { name: "Brand 3", image: "path of the image", id: "8w7chu77" },
            { name: "Brand 4", image: "path of the image", id: "8w7chu77" },
        ],
        results: 4
    })

}
export async function POST(req: NextRequest) {
    // some logic  
    //   write queries


    return NextResponse.json({})

}