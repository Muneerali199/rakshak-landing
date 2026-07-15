import { highlightCode } from "@/lib/shiki";
import LiveCodeDemoClient from "./LiveCodeDemoClient";

const vulnerableCode = `def get_user(username):
    query = f"SELECT * FROM users 
             WHERE name = {username}"
    db.execute(query)`;

const fixedCode = `def get_user(username):
    query = "SELECT * FROM users 
             WHERE name = ?"
    db.execute(query, (username,))`;

export default async function LiveCodeDemo() {
  const [vulnerableHtml, fixedHtml] = await Promise.all([
    highlightCode(vulnerableCode, "python"),
    highlightCode(fixedCode, "python"),
  ]);

  return (
    <LiveCodeDemoClient
      vulnerableHtml={vulnerableHtml}
      fixedHtml={fixedHtml}
    />
  );
}
