import { checkUser } from "@/lib/checkUser";

export default async function CheckUserServer() {
  await checkUser();
  return null; // This component does not render anything
}