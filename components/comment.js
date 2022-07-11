export default function({comment}) {
    // console.log(comment)
    return <div  className="d-inline-block border p-3 mt-5">{comment?.text?.replace(/<\/?[^>]+(>|$)/g, "")}</div>
}