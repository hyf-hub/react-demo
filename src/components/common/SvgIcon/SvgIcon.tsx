import classNames from "./index.module.scss";
export interface SvgIconProps {
  prefix?: string;
  name: string;
  color?: string;
}
const SvgIcon: React.FC<SvgIconProps> = (props) => {
  const { name, prefix = "svg", color = "red", ..._props } = props;
  const symbolId = `#${prefix}-${name}`;
  return (
    <svg {..._props} className={classNames.svgIcon}>
      <use href={symbolId} fill={color} />
    </svg>
  );
};
export default SvgIcon;
