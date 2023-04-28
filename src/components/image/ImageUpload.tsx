import uploadImage from "~/assets/img-upload.png";

interface ImageProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ImageUpload: React.FC<ImageProps> = (props: ImageProps) => {
  const { onChange } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed border-blue-300 w-full rounded-lg relative h-[200px] overflow-hidden group`}
    >
      <input type="file" className="hidden" multiple onChange={onChange} />

      <div className="flex flex-col items-center text-center pointer-events-none">
        <img src={uploadImage} className="max-w-[80px] mb-5" />
        <p className="font-semibold">Chọn một hoặc nhiều</p>
      </div>
    </label>
  );
};
export default ImageUpload;
