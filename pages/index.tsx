import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);


  const handleOnChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    if (name === 'weight') {
      setWeight(value);
    } else if (name === 'height') {
      setHeight(value);
    }
  };

  const calculateBmi = () => {
    const weightInKg = Number(weight);
    const heightInCm = Number(height);

    if (weightInKg > 0 && heightInCm > 0) {
      // Calculate BMI
      const heightInM = heightInCm / 100;
      const bmiValue = weightInKg / (heightInM * heightInM);

      // Set the calculated BMI
      setBmi(bmiValue);


    } else {
      console.log('Please enter valid weight and height values.');
    }
  };

  const checkBmiResult = () => {
    if (bmi === null) {
      return 'ผลลัพธ์';
    } else if (bmi < 18.5) {
      return 'น้ำหนักน้อยกว่าปกติ';
    } else if (bmi < 25) {
      return 'น้ำหนักปกติ';
    } else if (bmi < 30) {
      return 'น้ำหนักมากกว่าปกติ (ท้วม)';
    } else {
      return 'อ้วน';
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] flex-col pt-10 gap-3">
        <h1 className='text-5xl text-center'>
          BMI Calculator
        </h1>
        <p className='text-xl text-center'>
          โปรแกรมคำนวณค่าดัชนีมวลกาย - BMI
        </p>

        <label htmlFor='weight'>น้ำหนัก (kg)</label>
        <input
          onChange={handleOnChange}
          value={weight}
          type="number"
          name='weight'
          className='text-black text-center'
        />

        <label htmlFor='height'>ส่วนสูง (cm)</label>
        <input
          onChange={handleOnChange}
          value={height}
          type="number"
          name='height'
          className='text-black text-center'
        />
        <button
          type='button'
          onClick={calculateBmi}
          className='bg-white text-blue-800 px-2 py-1 rounded-md text-xl mt-4'
        >
          คำนวณ
        </button>
        <div className='result flex flex-col py-4 gap-4'> 
        <p className='text-xl text-center'>ค่า BMI คือ: {bmi}</p>
        <p className='text-2xl text-center'>ผลลัพธ์: {checkBmiResult()}</p>
        </div>
      </div>
    </main>
  );
}
