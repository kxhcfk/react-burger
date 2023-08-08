import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import styles from "./ProfileInfoPage.module.css";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { getUser, updateUser } from "../../store/actions/auth";
import classNames from "classnames";

const ProfileInfoPage: FC = () => {
    const dispatch = useDispatch();
    
    const { user, updateUserRequest } = useSelector(store => store.auth);
    
    const { data, setData, handleData } = useForm({
        name: user?.name,
        email: user?.email,
        password: user?.password || "",
    });
    
    const handleUpdateClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        dispatch(updateUser(data));
    };
    
    const handleCancelClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        setData({
            name: user?.name,
            email: user?.email,
            password: user?.password || "",
        });
    };
    
    const isChange = data.name !== user?.name || user?.email !== data.email || user?.password !== data.password;
    
    return (
        <div className={styles.root}>
            <form className={styles.form}>
                <Input
                    placeholder="Имя"
                    icon="EditIcon"
                    name="name"
                    onChange={handleData}
                    value={data.name || ""}
                />
                <Input
                    placeholder="Логин"
                    icon="EditIcon"
                    name="email"
                    onChange={handleData}
                    value={data.email || ""}
                />
                <PasswordInput
                    icon="EditIcon"
                    name="password"
                    onChange={handleData}
                    value={data.password || ""}
                />
                
                <div className={classNames(styles.buttons, isChange && styles.active)}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={updateUserRequest}
                        onClick={handleUpdateClick}
                    >
                        Сохранить
                    </Button>
                    
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={updateUserRequest}
                        onClick={handleCancelClick}
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfoPage;