import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:online_course/screens//app_colors.dart' as AppColors;
import 'package:http/http.dart' as http;
import 'package:path/path.dart' as Path;
import 'audio_file.dart';
class DetailAudioPage extends StatefulWidget {
  final booksData;
  final int index;
  const DetailAudioPage({required Key key, this.booksData, required this.index}) : super(key: key);

  @override
  _DetailAudioPageState createState() => _DetailAudioPageState();
}

class _DetailAudioPageState extends State<DetailAudioPage> {
  late AudioPlayer advancedPlayer;

  @override
  void initState(){
    super.initState();
    advancedPlayer= AudioPlayer();
  }

  @override
  Widget build(BuildContext context) {
    final double screenHeight=MediaQuery.of(context).size.height;
    final double screenWidth=MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: AppColors.audioBluishBackground,
      body: Stack(
        children: [
          Positioned(
              top:0,
              left: 0,
              right: 0,
              height: screenHeight/3,
              child: Container(
                  color:AppColors.audioBlueBackground

              )),
          Positioned(
              top:0,
              left: 0,
              right: 0,
              child: AppBar(
                leading: IconButton(
                  icon:Icon(Icons.arrow_back_ios,),
                  onPressed: (){
                    Navigator.of(context).pop();
                    advancedPlayer.stop();
                  },
                ),

                actions: [
                  IconButton(
                    icon:Icon(Icons.search,),
                    onPressed: (){},
                  )
                ],
                backgroundColor: Colors.transparent,
                elevation: 0.0,
              )),
          Positioned(
              left: 0,
              right: 0,
              top: screenHeight*0.2,
              height: screenHeight*0.36,
              child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    color:Colors.white,

                  ),
                  child:Column(
                    children: [
                      SizedBox(height: screenHeight*0.1,),
                      Text(this.widget.booksData[this.widget.index]["title"],
                        style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.bold,
                            fontFamily: "Avenir"
                        ),
                      ),
                      Text(this.widget.booksData[this.widget.index]["text"], style:TextStyle(
                          fontSize: 20
                      ),),
                      AudioFile(advancedPlayer:advancedPlayer, audioPath:this.widget.booksData[this.widget.index]["audio"]),
                    ],
                  )

              )),
          Positioned(
              top:screenHeight*0.12,
              left: (screenWidth-150)/2,
              right: (screenWidth-150)/2,
              height: screenHeight*0.16,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color:Colors.tealAccent, width: 1),
                  color:Colors.black,

                ),
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Container(
                    decoration: BoxDecoration(
                      //borderRadius: BorderRadius.circular(20),
                        shape: BoxShape.circle,
                        border: Border.all(color:Colors.black, width: 2),
                        image:DecorationImage(
                            image:AssetImage(this.widget.booksData[this.widget.index]["img"]),
                            fit:BoxFit.cover
                        )
                    ),
                  ),
                ),
              )

          )
        ],
      ),
    );
  }
}