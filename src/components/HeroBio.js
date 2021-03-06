import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeroUrls } from './HeroUrls';
import { Toggle } from './Toggle';
import { LoadingIndicator } from './LoadingIndicator';
import { Link } from 'react-router-dom';

export const HeroBio = ({ match }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const publicKey = "badd148cc7d5975dc382dfabd381d794";
    const baseUrl = "https://gateway.marvel.com/v1/public/";

    useEffect(() => {
        const axiosInstance = axios.create({
        baseURL: baseUrl,
        params: {
            "apikey": publicKey,
            "limit": 20
        },
            timeout: 10000,
            method: 'get',
            responseType: 'json',
        });
        axiosInstance.get(`characters/${match.params.id}`)
        .then(response => {
        setData(response.data.data.results[0]);
        setIsLoading(false);
        console.log(response.data.data.results[0]);
        })
        .catch(error => console.log(error));

    }, [baseUrl]);

    return (
        isLoading ? 
        <LoadingIndicator isLoading={isLoading} />
        : data &&
        <div className="border m-3 border-gray-400 rounded-lg overflow-hidden">
            <h1 className="text-4xl text-gray-700 uppercase p-1 font-comic">Character Profile:</h1>
            <div className="grid lg:grid-cols-2 lg:gap-10">
                <div>
                    <img className="lg:h-28 lg:object-contain" src={`${data.thumbnail.path}.${data.thumbnail.extension}`}></img>
                </div>
                <div>
                    <h2 className="text-3xl text-gray-700 uppercase p-2 font-comic">{data.name}</h2>
                    <HeroUrls urlList={data.urls} />
                    <p className="p-2 text-gray-600">{data.description || "No description available"}</p>
                    <div className="grid lg:grid-cols-2">
                        <Toggle title="Stories" className="text-3xl inline text-gray-700 uppercase p-2 font-comic">
                            {
                                data.stories.items.length > 0 
                                ?
                                data.stories.items.map(story =>
                                    <div key={story.resourceURI}>
                                        <p className="font-bold text-gray-700">{story.name}</p>
                                        <Link  
                                            className="text-blue-400"
                                            to={"/stories/" + story.resourceURI.split("/stories/")[1]}
                                            >See story</Link>
                                    </div>
                                )
                                :
                                <p>No data available</p>
                            }
                        </Toggle>
                        <Toggle title="Comics" className="text-3xl text-gray-700 uppercase p-2 font-comic">
                            {
                                data.comics.items.length > 0 
                                ?
                                data.comics.items.map(comic =>
                                    <div key={comic.resourceURI}>
                                        <p className="font-bold text-gray-700">{comic.name}</p>
                                        <Link  
                                            className="text-blue-400"
                                            to={"/comics/" + comic.resourceURI.split("/comics/")[1]}
                                        >See comic</Link>
                                    </div>
                                )
                                :
                                <p>No data available</p>
                            }
                        </Toggle>
                    </div>
                </div>
            </div>
        </div>
    )
}