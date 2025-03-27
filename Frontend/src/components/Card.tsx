import { Shareicon, Deleteicon, Noteicon } from "./ShareIcon"

interface CardProps {
    title: string,
    link: string,
    type: "youtube" | "twitter"
}

export const Card = ({ title, link, type }: CardProps) => {
    return (
        <div className="bg-yellow-200 rounded-lg shadow-md border-yellow-100 p-4 m-4 border h-80 w-72">
            <span className="flex items-center text-yellow-400 font-bold text-lg justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                    <div>
                        <Noteicon />
                    </div>
                    {title}
                </div>
                <div className="flex gap-3">
                    <div>
                        <a href={link} target="_blank">
                            <Shareicon />
                        </a>
                    </div>
                    <div>
                        <Deleteicon />
                    </div>
                </div>
            </span>
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
            </div>
        </div>

    )
}