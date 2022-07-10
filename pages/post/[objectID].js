import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function() {

    const router = useRouter();
    const {objectID} = router.query;
    const [details, setDetails] = useState({});
    useEffect(() => {
        if (router.isReady) {
            fetchPostDetails();
        }
    }, [router.isReady])

    const fetchPostDetails = async () => {
        await axios.get(`http://hn.algolia.com/api/v1/items/${objectID}`).then(response => setDetails(response.data))
    }
    console.log(details)
    return(
        <div>
            <h1>{details.title}</h1>
            <br />
            <h3>Points: {details.points}</h3>
            <br />
            <h3>Comments:</h3>
            {details?.children?.map((item, index) => <div  className="d-inline-block border p-3 mt-5" key={index}>{item.text.replace(/<\/?[^>]+(>|$)/g, "")}</div>)}
        </div>
    );
}