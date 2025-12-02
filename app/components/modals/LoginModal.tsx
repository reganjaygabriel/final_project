"use client";

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handlelogin } from "@/app/lib/action";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = { email: email, password: password };
    const response = await apiService.postWithOutToken(
      "/api/auth/login/",
      formData
    );

    if (response.access) {
      handlelogin(response.user.pk, response.access, response.refresh);
      loginModal.close();
      router.push("/");
    } else {
      setError(response.non_field_errors);
    }
  };

  const content = (
    <form action={submitLogin} className="space-y-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your e-mail address"
        type="email"
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      {errors.map((err, index) => (
        <div
          key={index}
          className="p-5 bg-airbnb text-white rounded-xl opacity-80"
        >
          {err}
        </div>
      ))}

      <CustomButton label="Submit" onClick={submitLogin} />
    </form>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
