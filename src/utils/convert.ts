export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result?.toString());
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const toDataUrl = (url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result?.toString());
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("Failed to load image"));
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};
