import {Inter} from 'next/font/google';
import React, {useState, useEffect} from 'react';
import Input from 'antd/lib/input/index.js';

const {Search} = Input;
const inter = Inter({subsets: ['latin']});


export default function Home() {
    // useState状态管理
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState({data: []});// 新增 state 用于存储从服务器获取的数据


    useEffect(() => {
        console.log('Data value:', data);
        console.log('Data type:', typeof data);
    }, [data]); // useEffect will run whenever data changes
    async function fetchData(keyword: any) {
        try {
            const response = await fetch(`/api/sqlquery?keyword=${encodeURIComponent(keyword)}`);
            const fetchedData = await response.json();
            console.log(fetchedData.data.length);
            if (fetchedData.data.length == 0) {
                console.log('Data from server: 0 valid data to show');
                const response = await fetch(`/api/runCommand?keyword=${encodeURIComponent(keyword)}`);
                console.log('fetch from the command ', response);
            } else {
                console.log('Data from server:', fetchedData);
                setData(fetchedData);
            }
        } catch (error) {
            console.error('Error fetching data from server:', error);
        }
    }

    const handleSearch = () => {
        console.log("handleSearch actived")
        fetchData(searchValue);
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    loading={false}
                    onSearch={handleSearch}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className="card mt-4">
                {data.data && Array.isArray(data.data) ? (
                    data.data
                        .slice()
                        .sort((a: any, b: any) => b.correlation - a.correlation)
                        .map((item: any, index) => (
                            <div key={index} className="border p-2 mb-2">
                                {/* 在这里显示 item 的具体属性 */}
                                <span style={{display: 'block'}}>keyword: {item.keyword}</span>
                                <span style={{display: 'block'}}>between: {item.between}</span>
                                <span style={{display: 'block'}}>compete: {item.compete}</span>
                                <span style={{display: 'block'}}>correlation: {item.correlation}</span>
                            </div>
                        ))
                ) : (
                    <p>No data available</p>
                )}
            </div>


        </main>
    );
}
