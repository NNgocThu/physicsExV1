import { useLocation } from 'react-router';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThemEdit = ({auth}) => {

    const [file, setFile] = useState(null);
    const [code, setCode] = useState(null);
    const [them, setThem] = useState(null);
    const navigate = useNavigate()
    const [thematics, setThematics] = useState();
    const location = useLocation();
    const path = location.pathname.split('/')[4];
    // console.log(path);

    useEffect(() =>{
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => {
                setThematics(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    // console.log(thematics);
    const th = thematics?  thematics.find((f) => f.code === path) : null;
    // console.log(th);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        if(file !== null) {
            data.append("file", file);
        } else {
            data.append("img", th.img);
        }
        if(code !== null) {
            data.append("code", code);
        } else {
            data.append("code", th.code);
        }
        if(them !== null) {
             data.append("thematic", them);
        } else {
            data.append("thematic", th.thematic);
        }
        
        data.append("id", th.code);

        axios.post(process.env.REACT_APP_SERVER_URL + "edit/them", data)
            .then(res => {
                alert("Cập nhật thành công!");
                // console.log(res)
                navigate('/admin/2')
            })
            .catch(err => console.log(err))
        
    }
    return(
        auth && auth.permission === "admin" && th &&
            (<div className="lg:mx-80 mx-24">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin chuyên đề
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <span className="text-slate-400">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file" 
                        onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="code"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Mã chuyên đề
                        </label>
                        <input type="text" id="code"
                            className="bg-slate-700 border  text-gray-900 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={th.code}
                            onChange={(e) => setCode(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="thematic"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Tên chuyên đề
                        </label>
                        <input
                            type="thematic"
                            id="thematic"
                            className="bg-slate-700 border  text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder={th.thematic}
                            onChange={(e) => setThem(e.target.value)}/>
                    </div>
                    <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                        Cập nhật
                    </button>
                </form>

            </div>)
    )
}

export default ThemEdit;