import Link from 'next/link';
import Popup from '../../../../components/Popup';
import Level from '../../../../components/Level';


export default function ROSLevel() {
    
    let lesson = (<><p>A node that publishes messages in a topic is called a <b className='font-extrabold'>publisher</b>.
    A node that listens to a topic and performs actions based on what messages it receives is called a <b className='font-extrabold'>subscriber</b>.</p>
    <p>Refer to the documentation below:</p>
    <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Subscriber-class.html"><u>ROSPy - Subscriber</u></a></li>
    <li><a target = "_blank" href = "https://docs.ros.org/en/melodic/api/rospy/html/rospy.topics.Publisher-class.html"><u>ROSPy - Publisher</u></a></li>
</>);
    let starterCode = `
def main():
    #Set up a ROS node that receives IR readings from our sensor and determine 
    #whether the collection bin is full by looking at the distance
    #from the sensor to the bottom of the bin
    pub = rospy.Publisher("is_bin_full", String, queue_size=10)
    def callback(data):
        #Publish "yes" if the bin is full (closer than 5 in) and "no" if the bin is not full
        if data < 5:
            BLANK
        else:
            BLANK
    rospy.init("bin_measurer")
    #Subscribe to the "ir_readings" topic, which has messages of type Int64
    rospy.Subscriber(BLANK)
    rospy.spin()

if __name__ == "__main__":
    main()
`
    let title = (<p>Subscribers and Publishers</p>);
    return (
    <Level section = "ros" lesson = {lesson} title = {title} starterCode={starterCode} language='python' correctAnswers={
        ['pub.publish(String("yes"))', 'pub.publish(String("no"))', '"ir_readings", Int64, callback']} levelName='ROS Level'></Level>
)};