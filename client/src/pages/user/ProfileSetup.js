import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROFILE } from "../admin/gql/mutations";
import { useForm } from "react-hook-form";
import Nav from "../../components/Nav";

const ProfileSetup = () => {
    const { register, handleSubmit, reset } = useForm();
    const [createProfile] = useMutation(CREATE_PROFILE);

    const onSubmit = async (formData, event) => {
        try {
            const { data } = await createProfile({
                variables: {
                    fullName: formData.fullName,
                    its: formData.its,
                    secondaryId: formData.secondaryId,
                    kurta: formData.kurta,
                    sleeve: formData.sleeve,
                    chest: formData.chest,
                    shoulders: formData.shoulders,
                    neck: formData.neck,
                    waist: formData.waist,
                    izaarLength: formData.izaarLength,
                    hips: formData.hips
                },
            });
            reset({
                fullName: "",
                its: "",
                secondaryId: "",
                kurta: "",
                sleeve: "",
                chest: "",
                shoulders: "",
                neck: "",
                waist: "",
                izaarLength: "",
                hips: "",

            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Nav />
            <div className="contentContainer">
                <div className='profileSetupForm'>
                    <h1 className="subHeader">PROFILE SETUP</h1>
                    <p>Please enter all measurements in inches</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                        <label htmlFor="kurta"></label>
                        <input placeholder="KURTA LENGTH" {...register("kurta", { required: true })} />
                        <label htmlFor="sleeve"></label>
                        <input placeholder="SLEEVE LENGTH"{...register("sleeve", { required: true })} />
                        <label htmlFor="chest"></label>
                        <input placeholder="CHEST"{...register("chest", { required: true })} />
                        <label htmlFor="shoulders"></label>
                        <input placeholder="SHOULDERS"{...register("shoulders", { required: true })} />
                        <label htmlFor="neck"></label>
                        <input placeholder="NECK"{...register("neck", { required: true })} />
                        <label htmlFor="waist"></label>
                        <input placeholder="WAIST"{...register("waist", { required: true })} />
                        <label htmlFor="izaarLength"></label>
                        <input placeholder="IZAAR LENGTH"{...register("izaarLength", { required: true })} />
                        <label htmlFor="hips"></label>
                        <input placeholder="HIPS"{...register("hips", { required: true })} />

                        <div className='loginButton'>
                            <button type="submit">SUBMIT</button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default ProfileSetup;