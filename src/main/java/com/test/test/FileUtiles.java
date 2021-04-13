package com.test.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class FileUtiles {
	
	 public static  List<Map<String,Object>> upload(HttpServletRequest request,MultipartFile [] files) {
		 List<Map<String,Object>> listMap = new ArrayList<Map<String,Object>>();
		 Map<String,Object> map = null;
		
		
		 String file_src = "test";
		 String uploadPath = request.getSession().getServletContext().getRealPath("/") + "uploads";
		 File dir = new File(uploadPath);
		 if (!dir.exists()) {
			 dir.mkdir();
		 }
		 
		 uploadPath +=File.separator + file_src;
		 dir = new File(uploadPath);
		 if (!dir.exists()) {
			 dir.mkdir();
		 }
		 
		 try {
				for (MultipartFile file : files) {
					// 원본 파일 명
		            String originFileName = file.getOriginalFilename(); 
		            if(!originFileName.equals("")) {
		            	 // 원본 파일 확장자
		            	System.out.println(originFileName);
			            String ext = originFileName.substring(originFileName.lastIndexOf("."),originFileName.length());
			        	//업로드 파일이름
			        	String uploadFileName = System.currentTimeMillis()+generateString1(5)+ext;
		            	
			        	map = new HashMap<String, Object>();
			        	String safeFile = uploadPath + File.separator + uploadFileName;
			        	file.transferTo(new File(safeFile));//파일 업로드 완성
			        	
			        	map.put("resultMsg", 1);
			        	map.put("originFileName", originFileName);
			        	map.put("uploadFileName", uploadFileName);
			        	map.put("size", file.getSize());
			        	map.put("ext", ext.substring(1,ext.length()));
			        	map.put("filepath", safeFile);
			        	listMap.add(map);
		            }
		        }
			} catch (IllegalStateException e) {
	            e.printStackTrace();
	        } catch (Exception e) {
	        	e.printStackTrace();
	        	map = new HashMap<String, Object>();
	        	map.put("resultMsg", 2);
	        	listMap.add(map);
			}
		 
		 return listMap;
	 }
	 
	 public static String generateString1(int length) {
        String pattern = "0123456789";
        java.util.Random rand = new java.util.Random();
        String s = "";
        for (int i = 0; i < length; i++) {
            s += pattern.charAt(rand.nextInt(pattern.length()));
        }
        return s;
    }
	 
	 //폴더전체 삭제
	 public static void deleteFolder(String path) {
		 File folder = new File(path);
		 try {
			 if(folder.exists()){
				File[] folder_list = folder.listFiles(); //파일리스트 얻어오기
					
				for (int i = 0; i < folder_list.length; i++) {
					if(folder_list[i].isFile()) {
						folder_list[i].delete();
					}else {
						deleteFolder(folder_list[i].getPath()); //재귀함수호출
					}
					folder_list[i].delete();
				}
				folder.delete(); //폴더 삭제
			 }
		 }catch (Exception e) {
			 e.getStackTrace();
		 }
	 }
	 
	 //파일 삭제
	 public static void deleteFile(String path) {
		 File file = new File(path);
		 try {
			 if(file.exists()){
				 file.delete(); //폴더 삭제
			 }
		 }catch (Exception e) {
			 e.getStackTrace();
		 }
	 }
	 
	 public static String getFileSize(String size) {
		 String gubn[] = {"Byte", "KB", "MB" };
	     String returnSize = new String ();
	     int gubnKey = 0;
	     double changeSize = 0;
	     long fileSize = 0;
	     try{
	    	 fileSize =  Long.parseLong(size);
	    	 for(int x=0 ; (fileSize / (double)1024 ) >0 ; x++, fileSize/= (double) 1024){
	    		 gubnKey = x;
	    		 changeSize = fileSize;
	    	 }
	    	 returnSize = changeSize + gubn[gubnKey];
	     }catch (Exception ex){ returnSize = "0Byte"; }
		
	     return returnSize;
	}
	 
	 public static void copy(File sourceF, File targetF) {
		 if(!targetF.exists()) {
			 targetF.mkdirs();
		 }
		 File[] target_file = sourceF.listFiles();
		 for (File file : target_file) {
			 File temp = new File(targetF.getAbsolutePath() + File.separator + file.getName());
			 if (file.isDirectory()) {
				 System.out.println("===");
				 System.out.println(targetF.getAbsolutePath() + File.separator + file.getName());
				 temp.mkdirs();
				 copy(file, temp);
			 } else {
				 FileInputStream fis = null;
				 FileOutputStream fos = null;
				 try {
					 fis = new FileInputStream(file);
					 fos = new FileOutputStream(temp);
					 byte[] b = new byte[4096];
					 int cnt = 0;
					 while ((cnt = fis.read(b)) != -1) {
						 fos.write(b, 0, cnt);
					 }
				 } catch (Exception e) {
					 e.printStackTrace();
				 } finally {
					 try {
						 fis.close();
						 fos.close();
					 } catch (IOException e) {
						 // TODO Auto-generated catch block
						 e.printStackTrace();
					 }
				}
			}
		}
	}
}