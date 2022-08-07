import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
import FlexBox from "./FlexBox";
import Indicator from "./Indicator";
import { atomIsLoaded } from "../data/atoms";
import { Popover, Transition } from "@headlessui/react";
import { useRecoilValue, useRecoilState, atomFamily } from "recoil";
/* This example requires Tailwind CSS v2.0+ */

export default function AvatarGroupsWithAction({ commentList }) {
    const [toggleViewAll, setToggleViewAll] = useState(false);
    const [isShowTips, setIsShowTips] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);
    const handleViewAll = () => {
        setToggleViewAll((prev) => !prev);
    };
    useEffect(() => {
        if (!toggleViewAll) window.scrollTo(0, 0);
    }, [toggleViewAll]);
    const handleMore = (type, id) => {
        setIsShowTips((prev) => !prev);
        if (type === "enter") setSelectedId(id);
        else if (type === "leave") setSelectedId(9999);
    };
    return (
        <>
            <Indicator />
            <div>
                <div className="flow-root mt-6">
                    <div style={{ marginBottom: "10px" }}>
                        {`comments: ${commentList.length ? commentList.length : "0"}`}
                    </div>
                    {commentList.length > 0 ? (
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                            {commentList.map((item, idx) => {
                                if (toggleViewAll || idx < 3)
                                    return (
                                        <li key={idx} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    {item?.imageUrl ? (
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={item?.imageUrl}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            style={{ backgroundColor: "pink" }}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {item.email}
                                                    </p>
                                                </div>
                                                <div>
                                                    <Popover className="relative">
                                                        <div
                                                            onMouseEnter={() =>
                                                                handleMore("enter", idx)
                                                            }
                                                            onMouseLeave={() =>
                                                                handleMore("leave", idx)
                                                            }
                                                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                                        >
                                                            More
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            show={selectedId === idx && isShowTips}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0 translate-y-1"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 translate-y-1"
                                                        >
                                                            <Popover.Panel
                                                                className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                                                                style={{ left: "-100px" }}
                                                            >
                                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                                        {item.body}
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </li>
                                    );
                            })}
                        </ul>
                    ) : (
                        <FlexBox justify="center" style={{ width: "100%" }}>
                            no comment
                        </FlexBox>
                    )}
                </div>
                {commentList.length > 3 && (
                    <div className="mt-6">
                        <div
                            onClick={handleViewAll}
                            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            {toggleViewAll ? "View less" : "View all"}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
