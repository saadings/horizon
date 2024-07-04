import { HeaderType } from "@/enums/headerBox";

const HeaderBox = ({
  type = HeaderType.TITLE,
  title,
  user,
  subtext,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === HeaderType.GREETING && (
          <span className="text-bankGradient">&nbsp;{user},</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
