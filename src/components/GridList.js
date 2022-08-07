import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkArrow = styled(Link)`
    text-decoration: none;
    border: none;
    &:active {
        border: none;
    }
    &:visited {
        border: none;
    }
`;

export default function GridList({ people }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {people.map((person) => (
                <LinkArrow key={person.email} to={`/postlist/${person.id}`}>
                    <div
                        key={person.email}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400  focus-within:ring-offset-2  active:border-pink-400"
                    >
                        <div className="flex-shrink-0">
                            {person?.imageUrl ? (
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={person?.imageUrl}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="h-10 w-10 rounded-full"
                                    alt=""
                                    style={{ backgroundColor: "pink" }}
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div href="#" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                <p className="text-sm text-gray-500 truncate">{person.userName}</p>
                            </div>
                        </div>
                    </div>
                </LinkArrow>
            ))}
        </div>
    );
}
