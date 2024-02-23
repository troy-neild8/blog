"use client"
import Head from "next/head";
import React, { FormEvent, useState } from "react";

export default function Home() {
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [result, setResult] = useState<number | string>(0); // State variable to store the result

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          a: numberOne,
          b: numberTwo,
        }),
      });
      const data = await response.json();
      setResult(`The result is: ${data.result}`); // Update the result state with the response
    } catch (error) {
      console.error("Error sending data:", error);
      setResult("An error occurred."); // Optionally handle errors by updating the result state
    }
  };

  return (
    <div>
      <Head>
        <title>Multiply</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Enter two numbers</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="numberOne"
            placeholder="Enter Number One"
            value={numberOne}
            onChange={(e) => setNumberOne(Number(e.target.value))}
          ></input>
          <input
            type="number"
            name="numberTwo"
            placeholder="Enter Number Two"
            value={numberTwo}
            onChange={(e) => setNumberTwo(Number(e.target.value))}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <p id="result">{result}</p> {/* Display the result */}
      </main>
    </div>
  );
}
