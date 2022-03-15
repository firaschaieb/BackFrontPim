import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
class TrackInfo extends StatefulWidget {

  final String _Nom;
  final String _instrument;
  final String _key;
  final String _measure;
  final String _tempo;
  final String _MusicTr;
  final String _musicProject;


  final String _id;

  TrackInfo(  this._Nom, this._instrument, this._key, this._measure, this._tempo, this._musicProject,this._MusicTr,this._id,);

  @override
  _TrackInfoState createState() => _TrackInfoState();
}

class _TrackInfoState extends State<TrackInfo> {
  String musicProject = "";
  final String _baseUrl = "10.0.2.2:3000";
  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();

          prefs.setString("Nom", widget._Nom);
          prefs.setString("instrument", widget._instrument);
          prefs.setString("key", widget._key);
          prefs.setString("measure", widget._measure);
          prefs.setString("tempo", widget._tempo);
          prefs.setString("MusicTr", widget._MusicTr );
          prefs.setString("musicProject", widget._musicProject );
          prefs.setString("_id1", widget._id );
print("22222222222222");
print(widget._Nom);

          //Navigator.pushNamed(context, "/Track");
        },

        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            InkWell(
                child: const Icon(Icons.restore_from_trash_rounded, size: 50,),
                onTap: () async {
                  Map<String, String> headers = {
                    "Content-Type": "application/json; charset=UTF-8"
                  };
                  Map<String, dynamic> userData = {
                    "_id1": widget._id,

                  };
                  http.delete(
                    Uri.http(_baseUrl, "/api/track/"), headers: headers,body: json.encode(userData))
                      .then((http.Response response) {
                    if (response.statusCode == 201) {
                      //Navigator.pushReplacementNamed(context, "/");
                    }
                    else {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return const AlertDialog(
                              title: Text("Information"),
                              content: Text(
                                  "Une erreur s'est produite. Veuillez réessayer !"),
                            );
                          });
                    }
                  });
                }
            ),
            Container(

            ),
            const SizedBox(
              height: 10,
            ),
            Column(
              children: [
                Text(widget._Nom),
                const SizedBox(
                  height: 10,
                ),
                Text(widget._instrument, textScaleFactor: 2),
                const SizedBox(
                  height: 10,
                ),
                Text(widget._key),

              ],
            ),


          ],
        ),
      ),

    );
  }
}
class Product1 {


  final String Nom;
  final String instrument;
  final String key;
  final String measure;
  final String tempo;
  final String MusicTr;
  final String musicProject;
  final String id;

  Product1( this.Nom, this.instrument, this.key, this.measure, this.tempo, this.MusicTr, this.musicProject,this.id);

  @override
  String toString() {
    return 'Product1{Nom: $Nom, instrument: $instrument, key: $key, measure: $measure, tempo: $tempo, MusicTr: $MusicTr, musicProject: $musicProject, id: $id}';
  }
}