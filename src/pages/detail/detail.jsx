import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import axios from "axios";
import Latex from 'react-latex';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { LikeStatus, Comment, Comments } from '../../components'
import { useNavigate } from 'react-router-dom';

function Detail({user}) {
    const [exercises, setExercises] = useState([]);
    const [answerState, setAnswerState] = useState(false);
    const [contentState, setContentState] = useState(false);
    const [com, setCom] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    const location = useLocation();
    const path = location.pathname.split('/')[2]
    const exercise = exercises.find((p) => p.no === path);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "comments", )
            .then(com => setCom(com.data))
            .catch(err => console.log(err))
    }, []);

    const comm = exercise && com.filter(f => f.eid === exercise.no);

    return (
        exercise ? (
            <div className=' text-white m-5'>
                <div className='flex justify-evenly'>
                    <div className=' text-green-600 float-left hover:text-green-400'
                        onClick={() => navigate(-1)}>
                        <BsArrowLeftCircleFill size={30} />Trở lại
                    </div>
                    <h1 className='lg:text-2xl text-lg font-bold text-center mb-10  text-green-400'>Chi tiết bài tập</h1>
                    <LikeStatus
                        exercise={exercise} />
                </div>

                <div className='sm:text-lg text-base mx-10'>
                    <p className=' text-cyan-500 font-bold'>Đề bài:</p>
                    <p className='ml-10 pb-3 border-b'>
                        <Latex>{exercise.question}</Latex>
                    </p>

                    <div className='lg:flex mt-5 text-teal-200 font-sans text-base sm:text-lg'>
                        <div className='flex-none lg:w-2/5 w-full'>
                            <button className='font-bold p-2 w-full rounded-l-md'>
                                Đáp án
                            </button>
                            <CopyToClipboard
                                text={exercise.answer.replaceAll('$', '')}
                                onCopy={() => setAnswerState(true)}
                            >
                                <div className='bg-gray-900 p-5 h-full mr-1 rounded-md'>
                                    <button className='float-right text-teal-500  p-1 ps-3 hover:text-white'>
                                        <AiOutlineCopy />
                                    </button>
                                    {answerState ? <p className='text-xs text-green-400 float-right pt-2'>Đã sao chép!</p> : null}
                                    <div className='ps-4 mt-3'><Latex>{exercise.answer}</Latex></div>

                                </div>
                            </CopyToClipboard>

                        </div>
                        <div className='flex-1 lg:w-3/5 w-full'>
                            <button className='font-bold p-2 rounded-r-md w-full'>
                                Hướng dẫn
                            </button>
                            <CopyToClipboard
                                text={exercise.content.replaceAll('$', '')}
                                onCopy={() => setContentState(true)}
                            >
                                <div className='bg-gray-900 rounded-md h-full'>
                                    <button className='float-right p-2 text-teal-500 hover:text-white'
                                    >
                                        <AiOutlineCopy />
                                    </button>
                                    {contentState ? <p className='text-xs text-green-400 float-right pt-6'>Đã sao chép!</p> : null}
                                    <div className='p-5'><Latex>{exercise.content}</Latex></div>
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="lg:mt-14 mt-5 rounded-lg border bg-gray-800 border-gray-600">
                        <h3 className="m-5 font-semibold">Bình luận </h3>
                        <Comment eid={exercise.no} user={user}/>
                        {comm.length? 
                        <>
                        <label htmlFor="message" className="block m-5 ml-10 text-sm font-medium  text-white">
                            Tất cả bình luận
                        </label>
                        {Array.isArray(comm)? 
                            comm.map((c, i) => (
                                <Comments key={i} com={c} />
                            )): <Comments com={com[0]}/>}
                        </> : 
                        <label htmlFor="message" className="block m-5 ml-10 text-sm font-medium  text-white">
                        Chưa có bình luận nào
                    </label>
                        }
                        
                    </div>
                </div>
            </div>
        ) : <p className='text-white'>Loading...</p>
    )
}

export default Detail;