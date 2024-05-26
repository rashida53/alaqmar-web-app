import React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE } from "./gql/queries";
import { useForm } from "react-hook-form";
import Nav from "../../components/Nav";

const Profile = () => {
    const { register, handleSubmit, reset } = useForm();
    const [getProfile, { data: profileData }] = useLazyQuery(GET_PROFILE, { variables: { its: "" } });
    const profile = profileData?.profile || {};

    const onSubmit = async (formData) => {
        await getProfile({
            variables: {
                its: formData.its
            }
        })
    }

    return (
        <>
            <Nav />
            {/* <div className="navAndHeader">
                <Nav />
            </div> */}
            <div className="mainContainer">
                <h1>Student Profiles</h1>
                <div className="searchProfileFormContainer">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("its", { required: true })}
                            placeholder="ITS"
                        ></input>
                        <input type="submit" />
                    </form>
                </div>
                {
                    profile &&
                    <>
                        <p>{profile.fullName}</p>
                        <p>{profile.its}</p>
                        <p>{profile.secondaryId}</p>
                        <p>Kurta Length: {profile.kurta}</p>
                        <p>Shoulders: {profile.shoulder}</p>
                        <p>Sleeve Length: {profile.sleeve}</p>
                        <p>Chest: {profile.chest}</p>
                        <p>Waist: {profile.waist}</p>
                        <p>Hips: {profile.hips}</p>
                        <p>Neck: {profile.neck}</p>
                    </>
                }
            </div>
        </>
    )

};

export default Profile;