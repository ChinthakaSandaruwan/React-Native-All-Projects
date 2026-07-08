import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  let name: string = "Chinthaka";
  let age: number = 24;
  let height: number = 60.25;
  let isStudent: boolean = true;

  let email: string = "chinthakasw000@gmail.com";
  // without type
  let gmail = "chinthakasw000@gmail.com";

  let scores: number[] = [10, 20, 30, 44, 55, 80];
  // without type
  let scores2 = [10, 20, 30, 44, 55, 80];

  let subjects: string[] = ["oop", "java", "pm", "maths"];
  let subjects2 = ["Maths", "Science", "English", "Sinhala"];

  function m() {}

  function n(): void {}

  function X(): string {
    return "Hello";
  }

  function Y(mark: number) {}

  function z(mark: number, subject: string) {}

  function z2(mark: number, subject: string): string {
    return " 60 - OOP"; 
  }
}
