import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Paper } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function Cards(prop) {
  console.log(prop);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      prop.mov.graphenabled=true;
    }
    else{
      prop.mov.graphenabled=false;
    }
    console.log(prop.mov);
    prop.showgraph(prop.mov);
  };

  const handleRemove=()=>{
    setChecked((prevstate)=>{
      if(prevstate)
      {
        return false;
      }
    });
    prop.remove(prop.mov);
  }
  const classes = useStyles();
  console.log(prop.mov.imgurl);
  return (
    <div className={classes.root}>
      <div style={{ width: "300px", height: "200px" }}>
        {prop.list && (
          <div>
            <Checkbox
              checked={prop.mov.graphenabled}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <DeleteForeverIcon onClick={handleRemove} />
            <div>
              <strong>{prop.mov.title}</strong>
            </div>
          </div>
        )}

        <img src={prop.mov.imgurl} alt="test" />
      </div>
    </div>
  );
}
