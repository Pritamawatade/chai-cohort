import TodoModel from "@/models/Todo.model";

export async function GET(request, context){
    const {id} = await context.params;
    try{
        await connectTodatabase();
        const todo = await TodoModel.findById(id);
        return NextResponse.json({todo});
    } catch(error){
        NextResponse.json({error: error.message}, {status: 500});
    }
}