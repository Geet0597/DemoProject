import React, { useCallback, useEffect, useRef, useState } from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { ICoords } from '../pages/Home';
import './Canvas.css';

interface FullScreenHandle {
  active: boolean;

  enter: () => Promise<void>;

  exit: () => Promise<void>;

  node: React.MutableRefObject<HTMLDivElement | null>;

}

interface CanvasProps {
  height: number;
  width: number;
  download: boolean;
  strokeStyle: string;
  lineWidth: number;
  coords: ICoords;
  handle: FullScreenHandle;
  setDownload: (state: boolean) => void;
  onSelected: (state: ICoords) => void;
}

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ height, width, download, setDownload, onSelected, 
  strokeStyle, lineWidth, coords, handle }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  let isDirty = false;
  let isDrag = false;
  let startX = -1;
  let startY = -1;
  let curX = -1;
  let curY = -1;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.strokeRect(coords.x,coords.y,coords.w,coords.h);
  },[coords.x, coords.y, coords.h, coords.w]);

  const handleMagicWand = () => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if(ctx){
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      addMouseEvents();
    }
  }

  const addMouseEvents = () => {
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
  }

  const onMouseDown = (e: any) => {
    isDrag = true
    curX = startX = e.offsetX
    curY = startY = e.offsetY
  };

  const onMouseMove = (e: any) => {
    if (! isDrag) return
    curX = e.offsetX
    curY = e.offsetY
    isDirty = true
  };
  
  const onMouseUp = (e: any) => {
    isDrag = false
    isDirty = true
    
    const rect = {
      x: Math.min(startX, curX),
      y: Math.min(startY, curY),
      w: Math.abs(e.offsetX - startX),
      h: Math.abs(e.offsetY - startY),
    }
    onSelected(rect);
  };
  

  useEffect(() => {
    if(download){
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const url = canvas?.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = 'filename.png';
      link.href = url ? url : '';
      link.click();
      setDownload(false);
    }
  },[download]);

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  const eraseDrawnThings = () => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const context = canvas?.getContext('2d');
    context?.clearRect(0, 0, canvas?.width ? canvas.width : 0, canvas?.height ? canvas.height : 0);
  }

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = '#2ee344';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const handleStartPaint = () => {
   if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }

  //Draw the text onto canvas:
  const drawText = (txt: string, x: number, y: number) => {
    const canvas: HTMLCanvasElement | null= canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if(ctx){
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.font = 'roboto';
      ctx.fillText(txt, x - 4, y - 4);
    }
  }

  const addImageInCanvas = (e:React.ChangeEvent<HTMLInputElement>) => {
    const canvas: HTMLCanvasElement | null= canvasRef.current;
    const context = canvas?.getContext('2d');
    if (e.target.files && e.target.files[0]) {
      const image =  URL.createObjectURL(e.target.files[0]);
      const i = new Image(800, 500);
      i.src = image;
      i.onload = (res) => {
        context?.drawImage(i, 200, 100, i.width, i.height);
      };
    }
  }
  let hasInput = true;
  const input = document.createElement('input');

  const handleEnter = (e: any) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      drawText(e.target.value, 500, 300);
      document.body.removeChild(input);
      hasInput = false;
    }
  }

  const addInput = (x: number, y: number) => {

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x - 4) + 'px';
    input.style.top = (y - 4) + 'px';

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    hasInput = true;
  }

  const addTextOnCanvas = (e: React.MouseEvent<any>) => {
    const canvas: HTMLCanvasElement | null= canvasRef.current;
    const context = canvas?.getContext('2d');
    if(context) {
      context.font = '20px sans-serif',
      hasInput = false;
      if (hasInput) return;
      addInput(e.clientX * 14, e.clientY);
    }
  }

  return (
    <div className='editIcon'>
      <div style={{
          width: "fit-content",
          borderRadius: "20px", 
          boxShadow: "0px 0px 7px 2px #cbc9c9",
          marginLeft:"15px"
        }}>
          <div className='editText'>
            <Tooltip title="Pen(P)" placement="right-start" arrow>
              <CreateOutlinedIcon onClick={handleStartPaint} style={{marginBottom : "10px"}} />
            </Tooltip>
            <Tooltip title="Text(T)" placement="right-start" arrow>
              <TitleOutlinedIcon style={{marginBottom : "10px"}} onClick= {addTextOnCanvas} />
            </Tooltip>
            <Tooltip title="Eraser(E)" placement="right-start" arrow>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" 
                height="16" fill="currentColor" className="bi bi-eraser" 
                style={{marginBottom : "10px", marginLeft: "4px"}} 
                onClick = {eraseDrawnThings}
                viewBox="0 0 16 16">
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 
                2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 
                2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 
                5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 
                1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 
                0 .707-.293l.16-.16z"/>
              </svg>
            </Tooltip>
            <Tooltip title="Magic Wand(MW)" placement="right-start" arrow>
              <AutoFixHighOutlinedIcon style={{marginBottom : "10px"}} 
                onClick = {handleMagicWand} />
            </Tooltip>
              <input
                style={{
                  display: "none"
                }}
                id="choose-file"
                type="file"
                onChange={addImageInCanvas}
              />
              <Tooltip title="Image(I)" placement="right-start" arrow>
                <label htmlFor="choose-file">
                  <InsertPhotoOutlinedIcon />
                </label>
            </Tooltip>
            <Tooltip title="FullScreen(F)" placement="right-start" arrow>
              <ZoomOutMapOutlinedIcon style={{marginBottom : "10px"}} 
                onClick={handle.enter} />
            </Tooltip>
          </div>
      </div>
      <div>
        <canvas ref={canvasRef} height={height} width={width} />
        <div className="mainContainer">
          <span className="zoomContainer">
            <AddIcon />
            <span style={{margin:"0 6px"}}>75%</span>
            <RemoveIcon />
          </span>
          <div className="arrowIcon" style={{ borderRadius: "20px",
            boxShadow: "rgb(203 201 201) 0px 0px 7px 2px",padding:"8px",lineHeight:"0"}}>
            <ArrowBackIcon style={{marginRight:"15px"}}/>
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
