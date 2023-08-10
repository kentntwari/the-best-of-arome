import Duration from "./Duration";
import CurrentTime from "./CurrentTime";
import ProgressBar from "./ProgressBar";

const DefaultFileReadings = () => {
  return (
    <div className="grid grid-cols-[35px_1fr_35px] items-center gap-1">
      <CurrentTime>00:00</CurrentTime>
      <ProgressBar />
      <Duration />
    </div>
  );
};

export default DefaultFileReadings;
