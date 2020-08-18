import React from 'react';
import '../../styles/styles.scss'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CloseIcon from '@material-ui/icons/Close';
import {config} from "../../config";
import {Article, Room} from "../../types";


interface Props {
    readonly appliedRoom: string;
    readonly article: Article;
    readonly rooms: Room[];
    readonly loading: boolean;
    readonly addImageEvent?: any;
    readonly deleteRoomEvent?: any;
    readonly applyWallpaper?: any;


}

const ImageViewer: React.FC<Props> = (props) => {
    const imageHOST: any = `${config.STATIC_HOST}`;
    const imagePath: any = `data:image/jpeg;base64,${props.appliedRoom}`;
    const wallpaper: any = `${imageHOST}/${props.article.image_path}`;

    const focusDiv = (idRoom: any) => {
        props.rooms.map((item: any, id: any) => {
            return item.focused = id === idRoom;
        });
    };


    return (
        <div className="image-viewer">
            <div className="carousel">
                <input type="file" name="file" id="file" onChange={(e) => {
                    props.addImageEvent(e)
                }}
                       className="add-image"/>

                <label htmlFor="file">
                    <PhotoCameraIcon style={{fontSize: "1.2vw"}}/>
                    <span>Add Interior</span>
                </label>

                {props.article.image_path ? <img className="wallpaper" src={wallpaper} alt="wallpaper"/> :
                    <div className="room-loading"><CircularProgress size={30}/></div>}

                {props.rooms.map((room: any, id: number) => {
                        return (
                            <div className="room-image" key={room.uuid}>
                                {room.image_path.includes("uploaded") ?
                                    <CloseIcon
                                        className="delete-image" fontSize={"small"}
                                        onClick={() => props.deleteRoomEvent(room.uuid)}/> : ""}
                                <img
                                    src={imageHOST + "/" + room.image_path}
                                    alt="room"
                                    style={room.focused ? {outline: " 0.33vw solid #FFFFFF", outlineOffset: "-0.3vw"} : {}}

                                    id={room.uuid}
                                    onClick={() => {
                                        props.applyWallpaper(room);
                                        focusDiv(id)
                                    }}
                                />
                            </div>
                        )
                    }
                )}
            </div>
            <div className="screen">
                {
                    props.appliedRoom && !props.loading ? <img src={imagePath} alt="apply-room"/> :
                        <div className="image-loading"><CircularProgress size={72}/></div>
                }
            </div>
        </div>
    );
};

export default ImageViewer;

