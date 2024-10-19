import { useCallback, useEffect, useRef, useState } from "react";

function App(props) {
  const [length, setLength] = useState(8);
  const [addNumber, setAddNumber] = useState(false);
  const [addChar, setAddChar] = useState(false);
  const [Password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const GeneratePassword = useCallback(() => {
    let gerPass = "";
    let storePass = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (addNumber) storePass += "0123456789";
    if (addChar) storePass += "~!@#$%^&*(){}";
    for (let i = 0; i < length; i++) {
      let genRandom = Math.floor(Math.random() * storePass.length);
      gerPass += storePass.charAt(genRandom);
    }
    setPassword(gerPass);
  }, [length, addNumber, addChar, Password]);

  useEffect(() => {
    GeneratePassword();
  }, [length, addNumber, addChar, setPassword]);

  const Show = () => {
    setShowPass((e) => !e);
    // console.log("Hello");
  };

  const copyPass = useRef(null);

  const copyClipBoard = useCallback(() => {
    copyPass.current?.select();
    copyPass.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);
  return (
    <>
      <div
        className="container min-w-full min-h-screen flex justify-center items-center"
        style={{
          background:
            "url('https://img.lovepik.com/background/20211021/large/lovepik-secure-password-landing-background-image_500503201.jpg') no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        <div className="password_box bg-[#09334be1] text-white rounded-xl p-5 flex flex-col border-solid border-4 border-white w-full m-5 md:w-[90%] lg:w-[70%] xl-[60%] 2xl:w-[50%] ">
          <div className="heading text-3xl font-bold uppercase tracking-[3px] ">
            <h1>{props.mainHeading}</h1>
          </div>
          <div className="input_field flex gap-5 my-5 bg-[#ffffff70] p-3 rounded-lg">
            <input
              type={showPass ? "text" : "password"}
              className="w-full rounded-lg outline-none border-none text-black font-semibold text-2xl px-5"
              placeholder="Password"
              value={Password}
              readOnly
              ref={copyPass}
            />
            <button
              className="bg-[#0059ff] rounded-lg hover:bg-[#0033ff] duration-300"
              onClick={copyClipBoard}
            >
              Copy Password
            </button>
          </div>
          <div className="control flex justify-around items-center text-2xl ">
            <div className="length flex gap-5">
              <input
                type="range"
                min={0}
                max={20}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <div>
                <h1>{length} : Length</h1>
              </div>
            </div>
            <div className="number">
              <input
                type="checkbox"
                className="w-[20px] h-[20px] cursor-pointer"
                onChange={() => setAddNumber((e) => !e)}
              />
              <label> : Number</label>
            </div>
            <div className="char">
              <input
                type="checkbox"
                className="w-[20px] h-[20px] cursor-pointer"
                onChange={() => setAddChar((e) => !e)}
              />
              <label> : Charachters </label>
            </div>
            <div className="show cursor-pointer" onClick={Show}>
              {showPass ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
