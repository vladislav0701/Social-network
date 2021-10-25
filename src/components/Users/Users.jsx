import React from "react";
import { NavLink } from "react-router-dom";
import * as axios from "axios"

import style from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 10) {
            pages.push(i);
        }
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && style.selectedPage}
                        onClick={() => { props.onPageChanged(p) }}>{p}</span>
                })}
            </div>

            {props.users.map(u =>
                <div className={style.wrapper}>
                    <div className={style.item}>
                        <NavLink to={"/profile/" + u.id} >
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="userPhoto" />
                        </NavLink>
                        <div>
                            {u.followed
                                ? <button onClick={() => { 

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`, {
                                        withCredentials: true, 
                                        headers: {
                                            "API-KEY": "467a0b90-5d62-46af-9300-417ab8395ae7"
                                        }
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id);
                                            }
                                        }); 
                                    
                                }}>Unfollow</button>
                                : <button onClick={() => { 

                                    axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "467a0b90-5d62-46af-9300-417ab8395ae7"
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id);
                                            }
                                        }); 

                                }}>Follow</button>}
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.name}>
                            <h3>{u.name}</h3>
                            <p>{u.status != null ? u.status : "In touch"}</p>
                        </div>

                        <div className={style.location}>
                            <div className={style.country}>Country</div>
                            <div>City</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users;