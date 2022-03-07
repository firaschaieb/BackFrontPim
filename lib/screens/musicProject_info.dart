import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
class MusicInfo extends StatefulWidget {
  final String _Nom;
  final String _style;
  final String _type;
  final String _id;


  MusicInfo(this._Nom, this._style, this._type, this._id);

  @override
  State<MusicInfo> createState() => _MusicInfoState();
}
final GlobalKey<FormState> _keyForm = GlobalKey<FormState>();
class _MusicInfoState extends State<MusicInfo> {

  final String _baseUrl = "10.0.2.2:3000";




  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();

          prefs.setString("Nom", widget._Nom);
          prefs.setString("style", widget._style);
          prefs.setString("type", widget._type);
          prefs.setString("_id", widget._id );
          Navigator.pushNamed(context, "/Track");
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

                  http.delete(
                    Uri.http(_baseUrl, "/api/musicproject/"+widget._id), headers: headers,)
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
                Text(widget._style, textScaleFactor: 2),
                const SizedBox(
                  height: 10,
                ),
                Text(widget._type),
              ],
            ),

          ],
        ),
      ),

    );

  }

}
class Product {
  final String Nom;
  final String style;
  final String type;
  final String id;

  Product(this.Nom, this.style, this.type, this.id);

  @override
  String toString() {
    return 'Product{Nom: $Nom, style: $style, type: $type, id: $id}';
  }
}
