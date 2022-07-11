import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Comment from "../../components/comment";
import styles from "../../styles/Home.module.css";
export default function() {

    const router = useRouter();
    const {objectID} = router.query;
    const [details, setDetails] = useState({});
    const [allComments, setAllComments] = useState([])
    const commentsRef = useRef(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (router.isReady) {
            fetchPostDetails();
        }
    }, [router.isReady])

    useEffect(() => {
        if (Object.keys(details).length != 0) {
            printComments(details, commentsRef.current, 0)
        }
    }, [details])

    const fetchPostDetails = async () => {
        await axios.get(`http://hn.algolia.com/api/v1/items/${objectID}`).then(response => {
            setDetails(response.data)
            setLoading(false);
        })
    }

    const printComments = (comment, target, index = 0) => {
        let instanceTarget = target;
        if (comment?.children?.length !== 0 && index < 20) {
            const subTarget = document.createElement('div');
            subTarget.classList.add(`depth-${index}`, 'd-flex', 'flex-column');
            subTarget.classList.add('border-start')
            subTarget.style.marginLeft = 25 * index + 'px';
            instanceTarget.insertAdjacentElement('beforeend', subTarget);
            comment?.children?.map((subComment, index) => {
                printComments(subComment, subTarget, index)
            })
        } 

        if (comment.text) {
            const commentElement = document.createElement('span');
            commentElement.classList.add('d-inline-block', 'text-break');
            commentElement.style.marginLeft = '25px';
            commentElement.innerText = comment.text;
            instanceTarget.insertAdjacentElement('beforeend', commentElement)
        }
    }
    return(
        <div className="d-flex flex-column">
            {
                loading ? <div className={styles.loader}>Loading...</div> :
                <main className={`${styles.main} d-flex flex-column`}>
            <h1>{details.title}</h1>
            <br />
            <h3>Points: {details.points}</h3>
            <br />
            <h3>Comments:</h3>
            <div className="d-flex flex-column" ref={commentsRef}></div>
        </main>

            }
        </div>
    );
}