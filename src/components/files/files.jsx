import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '../listItem/listItem';

const Files = () => {

    const [files, setFiles] = useState()
    const [input, setInput] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "docs")
            .then(res => {
                setFiles(res.data)
                setResult(res.data)})
            .catch(err => console.log(err))
    }, []);

    const handleKeyUp = () => {
        const grade = files.filter(f => f.grade.includes(input));
        const names = files.filter(f => f.name.includes(input));
        
        setResult(grade.length ? grade :
            names.length ? names : "Không tìm thấy");
    }

    return(
        files ? (
            <div className="mx-10">
            <div className="text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách tài liệu</div>
            <div className='mx-5 mb-2 p-1 bg-teal-700 rounded-xl w-full flex justify-center'>
                <div className='flex'>
                    <input className='rounded-lg text-black outline-none mt-1 h-10 px-3'
                    type="text"
                    placeholder='  Lớp, tên tài liệu...'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyUp} />
                </div>
            </div>

            {Array.isArray(result) ?
                (<table className="table-fixed ml-5 border-collapse bg-slate-700 rounded-lg  border-neutral-600 w-full sm:md:text-lg text-xs">
                        <thead className="border-b-2 align-baseline  ">
                            <tr className='p-3'>
                                <th>Lớp</th>
                                <th>Tên tài liệu</th>
                                <th>Tùy chỉnh</th>

                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {result.map((file, index) => (
                                <ListItem
                                    key={index}
                                    item2={file.grade}
                                    item3={file.name} />))}
                        </tbody>
                    </table>
                ) : (<p className='text-lg text-amber-300 text-center'>{result}</p>)}
        </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)
    )
}

export default Files;