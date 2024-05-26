import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_PROFILE } from "./gql/mutations";
import Nav from "../../components/Nav";

const CreateProfile = () => {
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
            <div className="mainContainer">
                <h1>Create Profile</h1>
                <div className="profileFormContainer">
                    <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                        <label htmlFor="fullName">Full Name</label>
                        <input {...register("fullName", { required: true })} />
                        <label htmlFor="its">ITS</label>
                        <input {...register("its", { required: true })} />
                        <label htmlFor="secondaryID">TR No.</label>
                        <input {...register("secondaryID", { required: true })} />
                        <label htmlFor="kurta">Kurta Length</label>
                        <input {...register("kurta", { required: true })} />
                        <label htmlFor="sleeve">Sleeve Length</label>
                        <input {...register("sleeve", { required: true })} />
                        <label htmlFor="chest">Chest</label>
                        <input {...register("chest", { required: true })} />
                        <label htmlFor="shoulders">Shoulders</label>
                        <input {...register("shoulders", { required: true })} />
                        <label htmlFor="neck">Neck</label>
                        <input {...register("neck", { required: true })} />
                        <label htmlFor="waist">Waist</label>
                        <input {...register("waist", { required: true })} />
                        <label htmlFor="izaarLength">Izaar Length</label>
                        <input {...register("izaarLength", { required: true })} />
                        <label htmlFor="hips">Hips</label>
                        <input {...register("hips", { required: true })} />

                        <button type="submit">
                            <h3>Create</h3>
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProfile;