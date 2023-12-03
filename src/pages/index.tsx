import {Inter} from 'next/font/google'
import React from 'react';
import Input from 'antd/lib/input/index.js';


const {Search} = Input;
const inter = Inter({subsets: ['latin']})

// 在你的 React 组件或其他客户端代码中
async function fetchData() {
    const response = await fetch('/api/sqlquery');
    const data = await response.json();
    console.log('Data from server:', data);
}


export default function Home() {


    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Search placeholder="input search text" enterButton="Search" size="large" loading={false}
                       onClick={fetchData} />
            </div>
        </main>
    )
}
