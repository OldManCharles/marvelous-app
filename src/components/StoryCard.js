import React from 'react';
import { Link } from 'react-router-dom';
import { StoryOriginalIssue } from './StoryOriginalIssue';

export const StoryCard = ({info}) => {
    return (
        <div className="border m-3 border-gray-400 rounded-b-md">
            {/* <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`}></img> */}
            <h2 className="text-lg text-gray-700 uppercase p-2 font-comic">Description</h2>
            <p className="px-2 text-gray-600">{info.title}</p>
            <h2 className="text-lg text-gray-700 uppercase p-2 font-comic">From:</h2>
            <StoryOriginalIssue issue={info.originalIssue} />
            <div className="flex justify-end">
                <Link 
                    to={`/comics/${info.id}`}
                    className="py-2 px-3 m-2 bg-marvelRed text-marvelWhite uppercase font-comic rounded" 
                    >Read more</Link>
            </div>
        </div>
    );
}