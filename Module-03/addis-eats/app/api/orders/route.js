import { orderSchema } from "@/app/schema";
import { createOrder } from "@/app/db";
export async function POST(request) {
  const body = await request.json();

  const result = orderSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { fieldErrors: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const order = await createOrder(result.data);
  return Response.json(order, { status: 201 });
}
