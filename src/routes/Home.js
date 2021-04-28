import { dbService } from "fbase";
import React, {useEffect, useState} from "react";

const Home = ({ userObj }) => {
    // define useState
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // define Events
    const onSubmit = async(event) => {
        event.preventDefault();

        await dbService.collection("nweets").add({
            text: nweet,
            wrk_time: Date.now(),
            wrk_id: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        const{
            target:{value},
        } = event;

        setNweet(value);
    };

    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot=>{
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));

            setNweets(nweetArray);
        });
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" maxLength={120} value={nweet} onChange={onChange}/>
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text} {nweet.wrk_time} </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;