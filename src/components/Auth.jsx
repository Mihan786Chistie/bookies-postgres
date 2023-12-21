import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../dbConnect";
import "./Auth.css"

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const emailRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();
    const userIdRef = useRef(); // Add a reference for user_id

    const handleSignup = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const fullName = fullNameRef.current?.value;
        const userId = userIdRef.current?.value;

        try {
            const { user, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                setHelperText({ error: true, text: error.message });
            } else if (!user && !error) {
                // Store additional user details in the 'users' table
                const { data, error } = await supabase
                    .from("users")
                    .insert([{ user_id: userId, full_name: fullName, email, password }]);

                if (error) {
                    console.error("Error storing user details:", error.message);
                }

                setHelperText({
                    error: false,
                    text: "Registartion Succcesfull!",
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleLogin = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const { user, error } = await supabase.auth.signIn({ email, password });

            if (error) {
                setHelperText({ error: true, text: error.message });
            } else if (!user && !error) {
                setHelperText({
                    error: false,
                    text: "An email has been sent to you for verification!",
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <>
        <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
</style>

            <div class="wrapper">
                <h2>Registration</h2>
                <form>
                    <div class="input-box">
                        <input type="text" placeholder="Enter your User Id" ref={userIdRef} required />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter your name" ref={fullNameRef} required />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter your email" ref={emailRef} required />
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="Create password" ref={passwordRef} required />
                    </div>
                    <div class="input-box button">
                        <button type="button" onClick={handleSignup}>
                            Sign Up
                        </button>
                    </div>
                    {helperText.error && <p style={{ color: "red" }}>{helperText.text}</p>}
                    {!helperText.error && helperText.text && <p style={{ color: "green" }}>{helperText.text}</p>}
                </form>
            </div>
        </>
    );
};

export default Auth;
